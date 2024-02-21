import React from 'react';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import '../../../css/misBtns.css'

const ExcelExport = ({ excelData, fileName}) => {

  const fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  return (
    <>
      <button className='Btn' variant='contained'
        onClick={(e) => exportToExcel(fileName)} color='primary'
        style={{ cursor: "pointer", fontSize: 14}}
        >Exportar a excel
      </button>
    </>
  )
}

export default ExcelExport;