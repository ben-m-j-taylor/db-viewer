// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Deserialize;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct AddConnectionDataModel {
    connection_string: String,
    username: String,
    password: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command(rename_all="snake_case")]
fn add_connection(data: AddConnectionDataModel) -> bool {
    println!("ConnectionString = {}", data.connection_string);
    println!("Username = {}", data.username);
    println!("Password = {}", data.password);

    return true;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![add_connection])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
