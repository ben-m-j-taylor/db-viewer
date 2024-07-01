use tauri::State;
use serde::{Serialize, Deserialize};
use tiberius::{ Row, Column, ColumnType, Query};
use anyhow::Result;
use std::time::SystemTime;

use crate::common::application_state::WrappedState;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct QueryResults {
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

#[derive(Deserialize)]
#[serde(rename_all = "snake_case")]
pub struct RunQueryDataModel {
    connection_id: String,
    query_string: String,
}

#[tauri::command(rename_all="snake_case")]
pub async fn run_query(data: RunQueryDataModel, state: State<'_, WrappedState>) -> Result<QueryResults, ()> {
    let connection_id = data.connection_id;

    let mut s = state.lock().await;

    let mut connection = s.db_connections.get_mut(&connection_id).expect("Could not get connection from state.");

    let select = Query::new(data.query_string);

    let start_time = SystemTime::now();

    let stream = select.query(&mut connection).await.unwrap();

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

                let parsed_value = parse_value(data_type, i, b, i2, c);

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

fn parse_value(data_type: ColumnType, row_index: usize, row: &Row, column_index: usize, column: &Column) -> String {
    return match data_type {
        ColumnType::NVarchar => {
            println!("Row {row_index} Column {column_index} ColumnType::NVarchar");

            let raw_value: &str = row.get(column.name()).unwrap();
            
            let string_value  = raw_value.to_string();

            string_value
        },
        ColumnType::Null => {
            println!("Row {row_index} Column {column_index} ColumnType::Null");

            "Null not implemented yet".to_string()
        },
        ColumnType::Bit => {
            println!("Row {row_index} Column {column_index} ColumnType::Bit");

            "Bit not implemented yet".to_string()
        },
        ColumnType::Int1 => {
            println!("Row {row_index} Column {column_index} ColumnType::Int1");

            let raw_value: u8 = row.get(column.name()).unwrap();

            let string_value = raw_value.to_string();

            string_value
        },
        ColumnType::Int2 => {
            println!("Row {row_index} Column {column_index} ColumnType::Int2");

            let raw_value: i16 = row.get(column.name()).unwrap();

            let string_value = raw_value.to_string();

            string_value
        },
        ColumnType::Int4 => {
            println!("Row {row_index} Column {column_index} ColumnType::Int4");

            let raw_value: i32 = row.get(column.name()).unwrap();

            let string_value = raw_value.to_string();

            string_value
        },
        ColumnType::Int8 => {
            println!("Row {row_index} Column {column_index} ColumnType::Int8");

            let raw_value: i64 = row.get(column.name()).unwrap();

            let string_value = raw_value.to_string();

            string_value
        },
        ColumnType::Datetime4 => {
            println!("Row {row_index} Column {column_index} ColumnType::Datetime4");

            "Datetime4 not implemented yet".to_string()
        },
        ColumnType::Float4 => {
            println!("Row {row_index} Column {column_index} ColumnType::Float4");

            "Float4 not implemented yet".to_string()
        },
        ColumnType::Float8 => {
            println!("Row {row_index} Column {column_index} ColumnType::Float8");

            "Float8 not implemented yet".to_string()
        },
        ColumnType::Money => {
            println!("Row {row_index} Column {column_index} ColumnType::Money");

            "Money not implemented yet".to_string()
        },
        ColumnType::Datetime => {
            println!("Row {row_index} Column {column_index} ColumnType::Datetime");

            "Datetime not implemented yet".to_string()
        },
        ColumnType::Money4 => {
            println!("Row {row_index} Column {column_index} ColumnType::Money4");

            "Money4 not implemented yet".to_string()
        },
        ColumnType::Guid => {
            println!("Row {row_index} Column {column_index} ColumnType::Guid");

            "Guid not implemented yet".to_string()
        },
        ColumnType::Intn => {
            println!("Row {row_index} Column {column_index} ColumnType::Intn");

            let raw_value: i32 = row.get(column.name()).unwrap();

            let string_value = raw_value.to_string();

            string_value
        },
        ColumnType::Bitn => {
            println!("Row {row_index} Column {column_index} ColumnType::Bitn");
            
            let raw_value: bool = row.get(column.name()).unwrap();

            let string_value: String;
            
            if raw_value == true {
                string_value = "true".to_string();
            } else {
                string_value = "false".to_string();
            }

            string_value
        },
        ColumnType::Decimaln => {
            println!("Row {row_index} Column {column_index} ColumnType::Decimaln");

            "Decimaln not implemented yet".to_string()
        },
        ColumnType::Numericn => {
            println!("Row {row_index} Column {column_index} ColumnType::Numericn");

            "Numericn not implemented yet".to_string()
        },
        ColumnType::Floatn => {
            println!("Row {row_index} Column {column_index} ColumnType::Floatn");

            "Floatn not implemented yet".to_string()
        },
        ColumnType::Datetimen => {
            println!("Row {row_index} Column {column_index} ColumnType::Datetimen");

            "Datetimen not implemented yet".to_string()
        },
        ColumnType::Daten => {
            println!("Row {row_index} Column {column_index} ColumnType::Daten");

            "Daten not implemented yet".to_string()
        },
        ColumnType::Timen => {
            println!("Row {row_index} Column {column_index} ColumnType::Timen");

            "Timen not implemented yet".to_string()
        },
        ColumnType::Datetime2 => {
            println!("Row {row_index} Column {column_index} ColumnType::Datetime2");

            "DateTime2 not implemented yet".to_string()

            // let raw_value: DateTime<Utc> = b.get(c.name()).unwrap();
            
            // let string_value  = raw_value.to_string();

            // string_value
        },
        ColumnType::DatetimeOffsetn => {
            println!("Row {row_index} Column {column_index} ColumnType::DatetimeOffsetn");

            "DatetimeOffsetn not implemented yet".to_string()
        },
        ColumnType::BigVarBin => {
            println!("Row {row_index} Column {column_index} ColumnType::BigVarBin");

            "BigVarBin not implemented yet".to_string()
        },
        ColumnType::BigVarChar => {
            println!("Row {row_index} Column {column_index} ColumnType::BigVarChar");

            let raw_value: &str = row.get(column.name()).unwrap();
            
            let string_value  = raw_value.to_string();

            string_value
        },
        ColumnType::BigBinary => {
            println!("Row {row_index} Column {column_index} ColumnType::BigBinary");

            "BigBinary not implemented yet".to_string()
        },
        ColumnType::BigChar => {
            println!("Row {row_index} Column {column_index} ColumnType::BigChar");

            "BigChar not implemented yet".to_string()
        },
        ColumnType::NChar => {
            println!("Row {row_index} Column {column_index} ColumnType::NChar");

            "NChar not implemented yet".to_string()
        },
        ColumnType::Xml => {
            println!("Row {row_index} Column {column_index} ColumnType::Xml");

            "Xml not implemented yet".to_string()
        },
        ColumnType::Udt => {
            println!("Row {row_index} Column {column_index} ColumnType::Udt");

            "Udt not implemented yet".to_string()
        },
        ColumnType::Text => {
            println!("Row {row_index} Column {column_index} ColumnType::Text");

            "Text not implemented yet".to_string()
        },
        ColumnType::Image => {
            println!("Row {row_index} Column {column_index} ColumnType::Image");

            "Image not implemented yet".to_string()
        },
        ColumnType::NText => {
            println!("Row {row_index} Column {column_index} ColumnType::NText");

            "NText not implemented yet".to_string()
        },
        ColumnType::SSVariant => {
            println!("Row {row_index} Column {column_index} ColumnType::SSVariant");

            "SSVariant not implemented yet".to_string()
        },
    };
}
