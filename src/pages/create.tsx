import * as React from 'react'
import {
    Redirect,
  } from "react-router-dom";
interface IProps {
    
}
interface IState {
    adi: string,
    yazar: string,
    yayinEvi: string,
    redirect:boolean
  
}

class Create extends React.Component<IProps,IState>{
    xmlHttp:XMLHttpRequest;

    constructor(props:IProps) {
        super(props);
        this.state = {
            adi: '',
            yazar: '',
            yayinEvi: '',
            redirect:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit(event:any){
        event.preventDefault();
        this.xmlHttp= new XMLHttpRequest();
        this.xmlHttp.open("POST","http://5e456bfbe85a4e001492ca79.mockapi.io/books",false);
        this.xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        this.xmlHttp.send("adi="+this.state.adi+"&yazar="+this.state.yazar+"&yayinEvi="+this.state.yayinEvi);
        if(this.xmlHttp.status ==201){
            alert("Kitap Olusturuldu");
            this.setState({redirect:true});   
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }

    render(){
        return(
            <div>
                <h1>Create Page</h1>
                {this.renderRedirect()}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="">Kitap Adı: </label>
                        <input name="adi" type="text" value={this.state.adi} onChange={(e) => this.setState({ adi: e.target.value })}/>
                    <label htmlFor="">Yazar Adi: </label>
                        <input name="yazar" type="text" value={this.state.yazar} onChange={(e) => this.setState({ yazar: e.target.value })}/>
                    <label htmlFor="">Yayin Evi: </label>
                        <input name="yayinEvi" value={this.state.yayinEvi} type="text" onChange={(e) => this.setState({ yayinEvi: e.target.value })}/>
                    <button type="submit">ekle</button>
                </form>  
            </div>

        )
    }
}

export default Create;