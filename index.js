import data from './data.json' assert { type: 'json' }
let showLogo = true
let runningTotal = 0

//get query params from url
// const params = new Proxy(new URLSearchParams(window.location.search), {
//   get: (searchParams, prop) => searchParams.get(prop),
// })
// let invoice_data = params.invoice_data
// const data = JSON.parse(invoice_data)

function formatCurrency(amount) {
  return Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

document.addEventListener('DOMContentLoaded', init, false)
function init() {
  function print() {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600')
    mywindow.document.write('<html><head>')
    mywindow.document.write('<link rel="stylesheet" href="./index.css">')
    mywindow.document.write('</head><body >')
    mywindow.document.write(document.getElementById('div_print1').innerHTML)
    mywindow.document.write('</body></html>')
    mywindow.document.close()
    mywindow.focus()
    setTimeout(function () {
      mywindow.print()
      mywindow.close()
    }, 1000)
    // window.onafterprint = window.close()
  }
  var button = document.getElementById('printButton')
  button.addEventListener('click', print, true)
}

// Display Data
const setElementValue = function (dataNode, elementID) {
  let elNode
  if (dataNode && (elNode = document.getElementById(elementID))) {
    console.log(dataNode)
    elNode.innerHTML = dataNode
  }
}
const setElementAttrib = function (dataNode, elementID, attributeName) {
  let elNode
  if (dataNode && (elNode = document.getElementById(elementID))) {
    elNode.setAttribute(attributeName, dataNode)
  }
}

// setElementAttrib(data.header.logoUrl, 'logo')
setElementValue(data.header.INVOICE_NO, 'orderNo')
setElementValue(data.header.FLAG, 'docType')
setElementValue(data.header.COMPANY, 'companySubTitle')
setElementValue(data.header.CLIENT_NAME, 'customerName')
setElementValue('Payment Type: ' + 'data', 'paymentType')
setElementValue(data.header.USER_NAME, 'servedBy')
setElementValue(data.header.INVOICE_DATE, 'receiptDate')
setElementValue(formatCurrency(data.header.PAID_AMOUNT), 'amountPaid')
setElementValue(data.header.POLICY, 'policy')
setElementValue(formatCurrency(data.header.INV_VAT), 'TOTAL_VAT')
setElementValue(formatCurrency(data.header.SUB_TOTAL), 'sub_total')
setElementValue(formatCurrency(data.header.INV_VAT), 'taxes')
setElementValue(formatCurrency(data.header.INV_AMOUNT), 'grand-total')
setElementValue(formatCurrency(data.header.DISCOUNT), 'discount-Val')
setElementValue(formatCurrency(data.header.CHANGEAMT), 'remaining')
setElementValue(data.header.ADD2 + ', ' + data.header.ADD1, 'location')

let myTable = document.getElementById('myTable')
console.log(data.item_list)
for (let i = 0; i < data.item_list.length; i++) {
  let amountPrice = data.item_list[i].Price * data.item_list[i].Quantity
  let row = `<tr>
                  <td>${data.item_list[i].QUANTITY}</td>
                  <td>${data.item_list[i].ITEMDESC}</td>
                  <td class="text-right">${formatCurrency(
                    data.item_list[i].PRICE
                  )}</td>
                  <td class="text-right">${formatCurrency(
                    data.item_list[i].LINE_VALUE
                  )}</td>
              </tr>`
  myTable.innerHTML += row
}

//generating the qr code
const qrCodeData =
  'Invoice No: ' +
  '__' +
  data.header.INVOICE_NO +
  '__' +
  data.header.INVOICE_DATE +
  '__' +
  data.header.CLIENT_NAME
var qrcode = new QRCode(document.querySelector('.qrcode'), {
  text: `${qrCodeData}`,
  width: 180, //128
  height: 180,
  colorDark: '#000000',
  colorLight: '#ffffff',
  correctLevel: QRCode.CorrectLevel.H,
})

// 1D Barcode
var elBarcode = document.getElementById('barcode')
const barcodeData =
  'Invoice No:' +
  '__' +
  data.header.INVOICE_NO +
  '__' +
  data.header.INVOICE_DATE +
  '__' +
  data.header.CLIENT_NAME
if (elBarcode) {
  elBarcode.innerHTML = "<svg id='svgBarcode'></svg>"
  JsBarcode('#svgBarcode', barcodeData, {
    format: 'code128',
    width: 1.5,
    height: 30,
    margin: 0,
    marginTop: 0,
    textMargin: 0,
    displayValue: false,
  })
}
