import * as React from 'react';
import {
    Link
  } from "react-router-dom";
import '../styles/table.css';
interface IProps {
}

interface IState {
  books?: JSON[];
  table?:JSX.Element[];
  kitapAdiAra:String;
  yazarAdiAra:String;
  yayinEviAdiAra:String;
  fBooks:JSON[];
  
}
class list extends React.Component<IProps,IState>{
    xmlHttp: XMLHttpRequest;
    books:JSON[];
    i=0;

    constructor(props:any){
        super(props);
        this.state={
            books: this.kitapGetir(),
            table:this.books.slice(0,10).map((book:any,i:any,)=>{
                const {id,adi,yazar,yayinEvi}=book;
                return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{adi}</td>
                        <td>{yazar}</td>
                        <td>{yayinEvi}</td>
                        <td><Link  to={`/detail/${id}`}>Detaylar</Link></td> 
                    </tr>
                )
            }),
            kitapAdiAra:"",
            yazarAdiAra:"",
            yayinEviAdiAra:"",
            fBooks:null, 
        }
    }
    
    //Filtreleme
    async handleChange(title:string,event:any){
        if(title=="adi")
            await this.setState({kitapAdiAra:event.target.value});
        else if(title=="yazar")
            await this.setState({yazarAdiAra:event.target.value});
        else if(title=="yayinevi") 
            await this.setState({yayinEviAdiAra:event.target.value});

        let filteredBooks:JSON[]=[];
        let books=this.state.books;

        filteredBooks=books.filter((book:any)=>{
            const {id,adi,yazar,yayinEvi}=book;
            let a:string=adi;
            let b:string=yazar;
            let c:string=yayinEvi;
            return (a.toLowerCase().includes(this.state.kitapAdiAra.toString().toLowerCase())  &&
                    b.toLowerCase().includes(this.state.yazarAdiAra.toString().toLowerCase()) &&
                    c.toLowerCase().includes(this.state.yayinEviAdiAra.toString().toLowerCase()) );
        });
        console.log("Filtre Sonucu Kitap Sayısı: "+filteredBooks.length);
        this.setState({fBooks:filteredBooks})
        this.i=0;
        this.tabloAyarla(); 
    }
    
    kitapGetir(){
        this.xmlHttp= new XMLHttpRequest();
        this.xmlHttp.open("GET","http://5e456bfbe85a4e001492ca79.mockapi.io/books",false);
        this.xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        this.xmlHttp.send();
        if(this.xmlHttp.status ==200){
            this.books = JSON.parse(this.xmlHttp.response);
            console.log(this.books.length);
            console.log("Kitaplar Cekildi.");
            return this.books;
        }
    }

    tabloAyarla(){
        if(this.state.fBooks==null)
            this.books=this.state.books.slice(this.i,10+this.i);
        else
            this.books=this.state.fBooks.slice(this.i,10+this.i);
        
        this.setState({
            table: this.books.map((book:any,i:any,)=>{
            const {id,adi,yazar,yayinEvi}=book;
            return (
                
                <tr key={id}>
                    <td>{id}</td>
                    <td>{adi}</td>
                    <td>{yazar}</td>
                    <td>{yayinEvi}</td>
                    <td><Link to={`/detail/${id}`}>Detaylar</Link></td>
                </tr>
            )
        })})
    }

    render(){
        return (
            <div>
                <table className="booksTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Kitap Adı</th>
                            <th>Yazar</th>
                            <th>Yayın Evi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><input placeholder="Kitap Adı ile Filtreler" value={this.state.kitapAdiAra.toString()} type="text" name="kitapAdi" onChange={(e)=>this.handleChange("adi",e)}/></td>
                            <td><input placeholder="Yazar Adı ile Filtreler" value={this.state.yazarAdiAra.toString()} type="search" name="yazar" onChange={(e)=>this.handleChange("yazar",e)}/></td>
                            <td><input placeholder="Yayın Evi Adı ile Filtreler" value={this.state.yayinEviAdiAra.toString()} type="search" name="yayinEvi" onChange={(e)=>this.handleChange("yayinevi",e)}/></td>
                        </tr>
                        {this.state.table}
                    </tbody>
                </table>
                <div className="buttons">
                    <button className="pagingButtons" disabled={this.i==0} onClick={()=>{this.i=this.i-10;this.tabloAyarla();console.log(this.i)}}>Önceki</button>
                    <button className="pagingButtons" disabled={this.i>=this.state.books.length-10} onClick={()=>{this.i=this.i+10;this.tabloAyarla();console.log(this.i)}}>Sonraki</button>
                    <button className="createButton"><Link className="routerLink" to={"/create"}>Kitap Ekle</Link></button>

                </div>
               
            </div>
        )
    }
}

export default list