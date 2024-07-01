use tauri::async_runtime::Mutex;
use tiberius::Client;
use async_std::net::TcpStream;
use std::collections::HashMap;

pub type WrappedState = Mutex<ApplicationState>;

pub struct ApplicationState {
    pub db_connections: HashMap::<String, Client<TcpStream>>
}
