// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::async_runtime::Mutex;
use tauri::State;
use serde::{Serialize, Deserialize};
use tiberius::{AuthMethod, Client, ColumnType, Config, Query};
use async_std::net::TcpStream;
use anyhow::Result;
use std::time::SystemTime;

#[derive(Default)]
struct MSSQLClient(Mutex<Option<Client<TcpStream>>>);

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct AddConnectionDataModel {
    host: String,
    port: u16,
    username: String,
    password: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command(rename_all="snake_case")]
async fn add_connection(data: AddConnectionDataModel, mssql_client: State<'_, MSSQLClient>) -> Result<bool, ()> {
    let mut config = Config::new();

    config.host(data.host);
    config.port(data.port);

    config.authentication(AuthMethod::sql_server(data.username, data.password));

    // This shouldn't be done on production, make this configurable?
    config.trust_cert();

    let tcp = TcpStream::connect(config.get_addr()).await.unwrap();
     
    tcp.set_nodelay(true).unwrap();

    let client = Client::connect(config, tcp).await.unwrap();

    let mut st = mssql_client.0.lock().await;

    *st = Some(client);

    Ok(true)
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct QueryResults {
    time_elapsed: u128,
    results: Vec<QueryResult>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct QueryResult {
    columns: Vec<String>,
    rows: Vec<QueryResultRow>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct QueryResultRow {
    values: Vec<Option<String>>,
}

#[tauri::command(rename_all="snake_case")]
async fn run_query(query_string: String, mssql_client: State<'_, MSSQLClient>) -> Result<QueryResults, ()> {
    let mut s = mssql_client.0.lock().await;

    let mut st = s.as_mut().expect("Could not get mut ref from MutexGuard");

    let select = Query::new(query_string);

    let start_time = SystemTime::now();

    let stream = select.query(&mut st).await.unwrap();

    let mut time_elapsed = 0;

    match start_time.elapsed() {
        Ok(elapsed) => {
            time_elapsed = elapsed.as_millis();
        },
        Err(e) => {
            println!("Error: {e:?}");
        }
    }

    let raw_results = stream.into_results().await.unwrap();

    let mut results: Vec<QueryResult> = Vec::new();

    for a in raw_results.iter() {
        let mut columns: Vec<String> = Vec::new();
        let mut rows: Vec<QueryResultRow> = Vec::new();

        for (i, b) in a.iter().enumerate() {
            if i == 0 {
                for (i2, c) in b.columns().iter().enumerate() {
                    columns.push(c.name().to_string());
                    println!("Column {i2} Name = {}", c.name());
                }
            }

            let mut values: Vec<Option<String>> = Vec::new();

            for (i2, c) in b.columns().iter().enumerate() {
                let data_type = c.column_type();

                let parsed_value: String = match data_type {
                    ColumnType::NVarchar => {
                        println!("Row {i} Column {i2} ColumnType::NVarchar");

                        let raw_value: &str = b.get(c.name()).unwrap();
                        
                        let string_value  = raw_value.to_string();

                        string_value
                    },
                    ColumnType::Null => {
                        println!("Row {i} Column {i2} ColumnType::Null");
                        todo!()
                    },
                    ColumnType::Bit => {
                        println!("Row {i} Column {i2} ColumnType::Bit");
                        todo!()
                    },
                    ColumnType::Int1 => {
                        println!("Row {i} Column {i2} ColumnType::Int1");

                        let raw_value: u8 = b.get(c.name()).unwrap();

                        let string_value = raw_value.to_string();

                        string_value
                    },
                    ColumnType::Int2 => {
                        println!("Row {i} Column {i2} ColumnType::Int2");

                        let raw_value: i16 = b.get(c.name()).unwrap();

                        let string_value = raw_value.to_string();

                        string_value
                    },
                    ColumnType::Int4 => {
                        println!("Row {i} Column {i2} ColumnType::Int4");

                        let raw_value: i32 = b.get(c.name()).unwrap();

                        let string_value = raw_value.to_string();

                        string_value
                    },
                    ColumnType::Int8 => {
                        println!("Row {i} Column {i2} ColumnType::Int8");

                        let raw_value: i64 = b.get(c.name()).unwrap();

                        let string_value = raw_value.to_string();

                        string_value
                    },
                    ColumnType::Datetime4 => {
                        println!("Row {i} Column {i2} ColumnType::Datetime4");
                        todo!()
                    },
                    ColumnType::Float4 => {
                        println!("Row {i} Column {i2} ColumnType::Float4");
                        todo!()
                    },
                    ColumnType::Float8 => {
                        println!("Row {i} Column {i2} ColumnType::Float8");
                        todo!()
                    },
                    ColumnType::Money => {
                        println!("Row {i} Column {i2} ColumnType::Money");
                        todo!()
                    },
                    ColumnType::Datetime => {
                        println!("Row {i} Column {i2} ColumnType::Datetime");
                        todo!()
                    },
                    ColumnType::Money4 => {
                        println!("Row {i} Column {i2} ColumnType::Money4");
                        todo!()
                    },
                    ColumnType::Guid => {
                        println!("Row {i} Column {i2} ColumnType::Guid");
                        todo!()
                    },
                    ColumnType::Intn => {
                        println!("Row {i} Column {i2} ColumnType::Intn");

                        let raw_value: i32 = b.get(c.name()).unwrap();

                        let string_value = raw_value.to_string();

                        string_value
                    },
                    ColumnType::Bitn => {
                        println!("Row {i} Column {i2} ColumnType::Bitn");
                        
                        let raw_value: bool = b.get(c.name()).unwrap();

                        let string_value: String;
                        
                        if raw_value == true {
                            string_value = "true".to_string();
                        } else {
                            string_value = "false".to_string();
                        }

                        string_value
                    },
                    ColumnType::Decimaln => {
                        println!("Row {i} Column {i2} ColumnType::Decimaln");
                        todo!()
                    },
                    ColumnType::Numericn => {
                        println!("Row {i} Column {i2} ColumnType::Numericn");
                        todo!()
                    },
                    ColumnType::Floatn => {
                        println!("Row {i} Column {i2} ColumnType::Floatn");
                        todo!()
                    },
                    ColumnType::Datetimen => {
                        println!("Row {i} Column {i2} ColumnType::Datetimen");
                        todo!()
                    },
                    ColumnType::Daten => {
                        println!("Row {i} Column {i2} ColumnType::Daten");
                        todo!()
                    },
                    ColumnType::Timen => {
                        println!("Row {i} Column {i2} ColumnType::Timen");
                        todo!()
                    },
                    ColumnType::Datetime2 => {
                        println!("Row {i} Column {i2} ColumnType::Datetime2");

                        "DateTime2 not implemented yet".to_string()

                        // let raw_value: DateTime<Utc> = b.get(c.name()).unwrap();
                        
                        // let string_value  = raw_value.to_string();

                        // string_value
                    },
                    ColumnType::DatetimeOffsetn => {
                        println!("Row {i} Column {i2} ColumnType::DatetimeOffsetn");
                        todo!()
                    },
                    ColumnType::BigVarBin => {
                        println!("Row {i} Column {i2} ColumnType::BigVarBin");
                        todo!()
                    },
                    ColumnType::BigVarChar => {
                        println!("Row {i} Column {i2} ColumnType::BigVarChar");

                        let raw_value: &str = b.get(c.name()).unwrap();
                        
                        let string_value  = raw_value.to_string();

                        string_value
                    },
                    ColumnType::BigBinary => {
                        println!("Row {i} Column {i2} ColumnType::BigBinary");
                        todo!()
                    },
                    ColumnType::BigChar => {
                        println!("Row {i} Column {i2} ColumnType::BigChar");
                        todo!()
                    },
                    ColumnType::NChar => {
                        println!("Row {i} Column {i2} ColumnType::NChar");
                        todo!()
                    },
                    ColumnType::Xml => {
                        println!("Row {i} Column {i2} ColumnType::Xml");
                        todo!()
                    },
                    ColumnType::Udt => {
                        println!("Row {i} Column {i2} ColumnType::Udt");
                        todo!()
                    },
                    ColumnType::Text => {
                        println!("Row {i} Column {i2} ColumnType::Text");
                        todo!()
                    },
                    ColumnType::Image => {
                        println!("Row {i} Column {i2} ColumnType::Image");
                        todo!()
                    },
                    ColumnType::NText => {
                        println!("Row {i} Column {i2} ColumnType::NText");
                        todo!()
                    },
                    ColumnType::SSVariant => {
                        println!("Row {i} Column {i2} ColumnType::SSVariant");
                        todo!()
                    },
                };

                println!("Row {i} Parsed Value = {}", parsed_value);

                values.push(Some(parsed_value));
            }

            rows.push(QueryResultRow {
                values,
            })
        }

        results.push(QueryResult {
            columns,
            rows,
        });
    }

    let query_result = QueryResults {
        time_elapsed,
        results,
    };

    Ok(query_result)
}

fn main() {
    tauri::Builder::default()
        .manage(MSSQLClient(Default::default()))
        .invoke_handler(tauri::generate_handler![add_connection, run_query])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
