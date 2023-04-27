const books = [];

const booksMap = ()=>{
    const returnValue = books.map((book)=>{
        return ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        })
    });

    return returnValue;
}

const datasNameSpecific = (name)=>{
    const returnValue = books.reduce((result, book)=>{
        if(name != undefined){
            if(book.name.includes(name)){
                result.push({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })
            }
            return result;
        }
        return result;
    }, []);

    return returnValue;
}

const datasReadingSpecific = (reading)=>{
    const returnValue = books.reduce((result, book)=>{
        if(reading == 0 && book.reading == false){
            result.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })
        }if(reading == 1 && book.reading == true){
            result.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })
        }if(reading != 0 && reading !=1){
            return booksMap();
        }
        return result;
    },[]);

    return returnValue;
}

const datasFinishedSpecific = (finished)=>{
    const returnValue = books.reduce((result, book)=>{
        if(finished == 0 && book.finished == false){
            result.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })
        }if(finished == 1 && book.finished == true){
            result.push({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })
        }if(finished != 0 && finished !=1){
            return booksMap();
        }
        return result;
    },[])

    return returnValue;
}

module.exports = {books, booksMap, datasNameSpecific, datasReadingSpecific, datasFinishedSpecific};