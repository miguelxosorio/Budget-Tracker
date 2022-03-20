// var hold db connection
let db;

// establish a connection to IndexedDB database
const request = indexedDB.open('budget', 1);

// event will emit if the database version changes
request.onupgradeneeded = function(event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object store (table) - set auto increment
    db.createObjectStore('new_budget', { autoIncrement: true });
};

// upon a successful connection
request.onsuccess = function(event) {
    // when db is successfully created with its object store or simply established a connection, save reference to db in global var
    db = event.target.result;

    // check if app is online, if yes, run function to send all local db data to api
    if(navigator.onLine) {
        // add function here
    }
};

request.onerror = function(event) {
    // log error
    console.log(event.target.errorCode);
};

// this function will be executed if we attempt to enter new data and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['new_budget'], 'readwrite');
    // access the object store for new_budget
    const budgetObjectStore = transaction.objectStore('new_budget');
    // add record to your storr with add method
    budgetObjectStore.add(record);
}

// open a new transaction
function uploadBudget() {
    // open a transaction with the db
    const transaction = db.transaction(['new_budget'], 'readwrite');

    // access the object store
    const budgetObjectStore = transaction.objectStore('new_budget');

    // get all records from the object store and set to a variable
    const getAll = budgetObjectStore.getAll();
}