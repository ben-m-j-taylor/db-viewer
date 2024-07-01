// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::async_runtime::Mutex;
use std::collections::HashMap;

mod common;
use common::application_state::ApplicationState;

mod mssql;
use mssql::add_connection::add_connection;
use mssql::run_query::run_query;

fn main() {
    tauri::Builder::default()
        .manage(Mutex::new(ApplicationState { db_connections: HashMap::new() }))
        .invoke_handler(tauri::generate_handler![add_connection, run_query])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
