// download the excel file and read the data from it, update the data and upload it back in the application.
const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');
const url = "https://rahulshettyacademy.com/upload-download-test/index.html";
const filePath = "C:/Users/Lenovo/Downloads/download.xlsx";

const searchtext = 'Mango';
const updateValue = '350';

async function readExcelfile(searchtext, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    // reading the sheet
    let output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchtext) {
                output.row = rowNumber;
                output.column = colNumber;
                console.log("Found at:", rowNumber, colNumber);
            }
        })
    });
    return output;
}

async function writeExcelfile(searchtext, updateValue, change, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcelfile(searchtext, filePath);
    //const output = await readExcelfile(searchtext, filePath);
    console.log(output);
    // const cell = worksheet.getCell(output.row, output.column + change.colChange);

    const cell = worksheet.getCell(
        output.row + change.rowChange,
        output.column + change.colChange
    );
    cell.value = updateValue;


    console.log("Search Result:", output);
    console.log("Updating Cell:", output.row, output.column + change.colChange);
    await workbook.xlsx.writeFile(filePath);
}


test("download and upload", async ({ page }) => {
    const searchtext = 'Mango';
    const updateValue = '350';
    await page.goto(url);

    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('button', { name: 'Download' }).click();

    const download = await downloadPromise;

    await download.saveAs(filePath);
    // Test implementation


    await writeExcelfile(
        searchtext,
        updateValue,
        { rowChange: 0, colChange: 2 },
        filePath
    );
    await page.locator('#fileinput').setInputFiles(filePath);

    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(searchtext) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});





