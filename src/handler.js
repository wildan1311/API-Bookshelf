const {nanoid} = require('nanoid')
const {books, booksMap, datasNameSpecific, datasReadingSpecific, datasFinishedSpecific} = require('./books')

const addBookHandler = (request, h)=>{
    const {name, year, author, summary, publisher, pageCount, readPage, reading}= request.payload;
    const id = nanoid(16);
    const finished = pageCount===readPage? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage,
        reading, 
        id, 
        finished, 
        insertedAt, 
        updatedAt,
    }

    const data = {
        status: 'fail',
        message: '',
    }

    if(newBook.name == undefined ){
        data.message = "Gagal menambahkan buku. Mohon isi nama buku";
        const response = h.response(data).code(400);
        return response;
    }else if(newBook.readPage > newBook.pageCount){
        data.message = "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount";
        const response = h.response(data).code(400);
        return response;
    }else{
        books.push(newBook);
        const isSuccess = books.filter((book)=> book.id === id).length>0;
        if(!isSuccess){
            data.message = "Buku gagal ditambahkan";
            const response = h.response(data).code(500);
            return response;
        }else{
            data.status = "success";
            data.message = "Buku berhasil ditambahkan";
            data.data = {
                bookId: id,
            }
            const response = h.response(data).code(201);
            return response;
        }
    }
}

const getAllBooksHandler = (request, h)=>{
    const {reading, name, finished} = request.query;

    if(name!=undefined){
        const response = h.response({
            status: "success",
            data: {
                books: datasNameSpecific(name),
            },
        })
        response.code(200);
        return response;
    }

    if(reading!=undefined){
        const response = h.response({
            status: "success",
            data: {
                books: datasReadingSpecific(reading),
            }
        })
        response.code(200);
        return response;
    }

    if(finished!=undefined){
        const response = h.response({
            status: "success",
            data: {
                books: datasFinishedSpecific(finished),
            },
        })
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "success",
        data: {
            books: booksMap(),
        },
    })
    response.code(200);
    return response;
}

    

const getBookByIdHandler = (request, h)=>{
    const {bookId} = request.params;

    const book = books.filter((book)=>book.id == bookId)[0];

    if(book !== undefined){
        const response = h.response({
            status: "success",
            data: {
                book,
            }
        })
        response.code(200);
        return response;
    }else{
        const response = h.response({
            status: "fail",
            message: "Buku tidak ditemukan",
        })
        response.code(404);
        return response;
    }
}

const updateBookHandler = (request, h)=>{
    const {bookId} = request.params;
    const {name, year, author, summary, publisher, pageCount, readPage, reading}= request.payload;
    const updatedAt = new Date().toISOString();

    const data = {
        status: "fail",
        message: "",
    }
    if(name === undefined){
        data.message = "Gagal memperbarui buku. Mohon isi nama buku";
        const response = h.response(data).code(400);
        return response;
    }
    
    if(readPage > pageCount){
        data.message = "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount";
        const response = h.response(data).code(400);
        return response;
    }

    const index = books.findIndex((book)=> book.id == bookId);

    if(index==-1){
        data.message = "Gagal memperbarui buku. Id tidak ditemukan";
        const response = h.response(data).code(404);
        return response;
    }else{
        data.message = "Buku berhasil diperbarui";
        data.status = "success";
        books[index] = {
            ...books[index],
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            reading,
            updatedAt,
        }
        const response = h.response(data).code(200);
        return response;
    }

}

const deleteBookHandler = (request, h)=>{
    const {bookId} = request.params;

    const index = books.findIndex((book)=>book.id == bookId);

    if(index == -1){
        const response = h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        response.code(404);
        return response;
    }else{
        books.splice(index, 1)
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus",
        })
        response.code(200);
        return response;
    }
}

module.exports = {addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler};