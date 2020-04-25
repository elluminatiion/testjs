var data;
if (localStorage.getItem('lpu')) {
    data = JSON.parse(localStorage.getItem('lpu'));
    createtable();
} else {
    fileloadjson('lpu.json');
}

function fileloadjson(filename) {
    request = new XMLHttpRequest();
    request.open('GET', filename);
    request.onloadend = function (e) {
        parsejs(this.responseText);
        createtable();
        lcput();
    }
    request.send();
}

function parsejs(obj) {
    data = JSON.parse(obj);
}

function lcput() {
    localStorage.setItem('lpu', JSON.stringify(data));
}

function texttr(name, id) {
    return '<td><input onkeyup="changesave(' + name + ',' + id + ')" id="' + name + id + '" value="' + data[id][name] + '"></td>'
}

function deletetr(i) {
    result = confirm('Вы действительно хотите удалить?');
    if (result) {
        document.getElementById('id' + i).remove();
        delete (data[i]);
        lcput();
    }
}

function addel() {
    full_name = prompt('Введите наименование учреждения', '');
    if (full_name !== null) {
        adress = prompt('Введите адрес', '');
        if (adress !== null) {
            phone = prompt('Введите номер телефона', '');
            if (phone !== null) {
                result = {
                    'full_name': full_name,
                    'address': adress,
                    'phone': phone
                }
                data.push(result);
                createtable();
            }
        }
    }
}

function changesave(name, id) {
    data[id][name] = document.getElementById(name + id).value;
    lcput();
}

function createtable() {
    lcput();
    tbodyid = document.getElementById('table_class');
    tbodyid.innerHTML = '';
    for (i = 0; i < data.length; i++) {
        if (data[i]) {
            tbodyid.innerHTML += '<tr id="id' + i + '">' +
                '<td><div title="Удалить" class="close" onclick="deletetr(' + i + ')"></div></td>' +
                texttr('full_name', i) +
                texttr('address', i) +
                texttr('phone', i) +
                '</tr>'
        }
    }
}
