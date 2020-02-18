import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Detail from './detail';
interface IProps {
    
}

interface IState {
  books?: JSON[];
  table?:JSX.Element[];
  kitapAdiAra:String;
  
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
                        <Router>
                            <Link to={`/detail/${id}`}><td>Detaylar</td></Link>
                            <Switch>
                                <Route path="/:id" />
                            </Switch>
                        </Router>
                    </tr>
                )
            }),
            kitapAdiAra:"",
            
        }
    }
    
    async handleChange(event:any){
        console.log(event.target.value);
        await this.setState({
            kitapAdiAra:event.target.value
        })
        console.log(this.state.kitapAdiAra);
        /*this.state.books.forEach(book => {
            let a:any=book
            console.log(JSON.stringify(book));
            console.log(a.id)
        });*/
       /* await this.tabloAyarla(await this.state.books.filter((book:any)=>{
            const {id,adi,yazar,yayinEvi}=book;
            console.log(adi.includes(this.state.kitapAdiAra))
            adi.includes(this.state.kitapAdiAra);
        }));*/
        
        
    }

    kitapGetir(){
        this.xmlHttp= new XMLHttpRequest();
        this.xmlHttp.open("GET","http://5e456bfbe85a4e001492ca79.mockapi.io/books",false);    // Change this
        this.xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        this.xmlHttp.send();
        if(this.xmlHttp.status ==200){
            this.books = JSON.parse(this.xmlHttp.response);
            console.log(this.books.length);
            console.log("Kitaplar Cekildi.");
            return this.books;
        }
    }
    tabloAyarla(x:JSON[]=null){
        this.books=this.state.books.slice(this.i,10+this.i);
        if(x!=null){
            this.books=x;
            console.log(x.length)
            console.log(this.books[0])
        }
        this.setState({
            table: this.books.map((book:any,i:any,)=>{
            const {id,adi,yazar,yayinEvi}=book;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{adi}</td>
                    <td>{yazar}</td>
                    <td>{yayinEvi}</td>
                    <Router>
                        <Link to={`/Detail/${id}`}><td>Detaylar </td></Link>
                        <Switch>
                            <Route path="/Detail/:id" ><Detail/></Route>
                        </Switch>
                    </Router>
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
                            <td><input value={this.state.kitapAdiAra.toString()} type="text" name="kitapAdi" onChange={this.handleChange.bind(this)}/></td>
                            <td><input type="search" name="yazar" id=""/></td>
                            <td><input type="search" name="yayinEvi" id=""/></td>
                        </tr>
                        {this.state.table}
                    </tbody>
                </table>
                <button disabled={this.i==0} onClick={()=>{this.i=this.i-10;this.tabloAyarla();console.log(this.i)}}>Önceki</button>
                <button disabled={this.i>=this.state.books.length-10} onClick={()=>{this.i=this.i+10;this.tabloAyarla();console.log(this.i)}}>Sonraki</button>
            </div>
        )
    }
}

export default list