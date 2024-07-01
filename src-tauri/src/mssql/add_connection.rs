use tauri::State;
use tiberius::{AuthMethod, Client, Config};
use async_std::net::TcpStream;
use anyhow::Result;
use std::hash::{DefaultHasher, Hash, Hasher};
use serde::Deserialize;

use crate::common::application_state::WrappedState;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AddConnectionDataModel {
    host: String,
    port: u16,
    username: String,
    password: String,
}

impl Hash for AddConnectionDataModel {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.host.hash(state);
        self.port.hash(state);
        self.username.hash(state);
    }
}

#[tauri::command(rename_all="snake_case")]
pub async fn add_connection(data: AddConnectionDataModel, state: State<'_, WrappedState>) -> Result<Option<String>, ()> {
    let add_connection_data_model_hash = calculate_hash(&data).to_string();

    let connection_already_in_state: bool = state.lock().await.db_connections.contains_key(&add_connection_data_model_hash);

    if connection_already_in_state {
        return Ok(None);
    }

    let mut config = Config::new();

    config.host(data.host);
    config.port(data.port);

    config.authentication(AuthMethod::sql_server(data.username, data.password));

    // This shouldn't be done on production, make this configurable?
    config.trust_cert();

    let tcp = TcpStream::connect(config.get_addr()).await.unwrap();
     
    tcp.set_nodelay(true).unwrap();

    let client = Client::connect(config, tcp).await.unwrap();

    state.lock().await.db_connections.insert(add_connection_data_model_hash.clone(), client);

    Ok(Some(add_connection_data_model_hash))
}

fn calculate_hash<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}