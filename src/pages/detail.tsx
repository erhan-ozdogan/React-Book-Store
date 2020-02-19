import * as React from 'react';

  interface IProps {
    match:any;
}

interface IState {
    loaded:Boolean;
    book:{id:number,adi:string,yazar:string,yayinEvi:string};
  
}

class detail extends React.Component<IProps,IState>{
    userId:number;
    
    xmlHttp: XMLHttpRequest;

    constructor(props:IProps){
        
        super(props);
        this.state={
            loaded:false,
            book:{id:0,adi:'asdasdsadas',yazar:'',yayinEvi:''}
        }
        this.userId=this.props.match.params.id

    }
    componentDidMount(){
            
            this.xmlHttp= new XMLHttpRequest();
            this.xmlHttp.open("GET","http://5e456bfbe85a4e001492ca79.mockapi.io/books/"+this.userId,false);    // Change this
            this.xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
            this.xmlHttp.send();
            if(this.xmlHttp.status ==200){
                this.setState({book:JSON.parse(this.xmlHttp.response),loaded:true});

            }
    }

    render(){

        return(
            <div>
                <h1>{this.state.book.adi}</h1>
                <hr/>
                <img src="./assets/book.jpg" alt="book"/>
                <h4>ID: {this.state.book.id}</h4>
                <h4>Yazar: {this.state.book.yazar}</h4>
                <h4>Yayin Evi: {this.state.book.yayinEvi}</h4>
                <h4>Özet</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure laborum maxime impedit fuga in ipsam perferendis deleniti sequi harum consequuntur, assumenda unde libero ipsa voluptatibus incidunt corrupti quas cumque eaque.
                Quis earum iste et dicta eligendi voluptas molestiae facilis impedit aut laudantium error, assumenda recusandae tempora laboriosam inventore magni ad? Ratione voluptate totam provident officia repudiandae voluptatem aspernatur sit delectus.
                Quos, inventore! Corrupti laboriosam nesciunt magnam dolore iure cumque numquam odit mollitia suscipit, eveniet necessitatibus molestias aperiam ad saepe perferendis illo. Iusto autem sunt temporibus voluptas eveniet officiis ducimus sed.
                Nisi excepturi aut ratione unde qui eos, soluta facilis enim asperiores voluptatem eius, quod suscipit nam, et aspernatur pariatur aperiam nostrum quibusdam odit perspiciatis labore. Accusamus facere iste harum. Impedit?
                Nemo dolorem nesciunt similique non quidem. Numquam cumque laborum asperiores voluptatum ullam, quos ab eaque, iste nesciunt nulla accusantium ducimus atque minima natus dicta, facere maiores deserunt. Dicta, dolore ut.</p>
            </div>


        )
    }

}


export default detail