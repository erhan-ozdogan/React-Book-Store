import * as React from 'react';

class list extends React.Component{
    xmlHttp: XMLHttpRequest;
    books:[]=[];

    kitapGetir(){
        this.xmlHttp= new XMLHttpRequest();
        this.xmlHttp.open("GET","<Your API URL>",false);    // Change this
        this.xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        this.xmlHttp.send();
        if(this.xmlHttp.status ==200){
            this.books = JSON.parse(this.xmlHttp.response);
        }
        console.log(this.books)
    }
    tabloAyarla(){
        this.kitapGetir();
        return this.books.map((book,i)=>{
            const {id,adi,yazar,yayinEvi}=book;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{adi}</td>
                    <td>{yazar}</td>
                    <td>{yayinEvi}</td>
                </tr>
            )
        })
    }

    render(){
        
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Kitap Adı</th>
                            <th>Yazar</th>
                            <th>Yayın Evi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabloAyarla()}
                    </tbody>
                </table>
                <button onClick={()=>this.kitapGetir()}>Kitapları Getir</button>
            </div>
        )
    }
}

export default list