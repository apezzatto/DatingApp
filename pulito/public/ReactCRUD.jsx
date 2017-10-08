var StudentAll = React.createClass({   
  
  getInitialState: function () {  
    //return { name: '' ,address: '',email:'',contact:'',id:'',Buttontxt:'Save', data1: []};
      //alert("Fuck YOU!!!");
      this.componentDidMount();
      return { data1: ''};
  },  
   handleChange: function(e) {  
        this.setState({[e.target.name]: e.target.value});  
    },  
  
  componentDidMount() {  
   
    $.ajax({  
       //url: "api/getdata",  
       url: "api/home",  
       type: "GET",  
       dataType: 'json',  
       ContentType: 'application/json',  
       success: function(data) {           
         //alert("FUCK MTFCKR!");
         this.setState({data1: data.data});  
           
       }.bind(this),  
       error: function(jqXHR) {  
         console.log(jqXHR);  
             
       }.bind(this)  
    });  
  },  
    
DeleteData(id){  
  var studentDelete = {  
        'id': id  
           };        
    $.ajax({  
      url: "/api/Removedata/",  
      dataType: 'json',  
      type: 'POST',  
      data: studentDelete,  
      success: function(data) {  
        alert(data.data);  
         this.componentDidMount();  
  
      }.bind(this),  
      error: function(xhr, status, err) {  
         alert(err);   
             
            
      }.bind(this),  
      });  
    },  
   
  
  
    EditData(item){           
   this.setState({name: item.name,address:item.address,contact:item.contact,email:item.email,id:item._id,Buttontxt:'Update'});  
     },  
  
   handleClick: function() {  
   
   var Url="";  
   if(this.state.Buttontxt=="Save"){  
      Url="/api/savedata";  
       }  
      else{  
      Url="/api/Updatedata";  
      }  
      var studentdata = {  
        'name': this.state.name,  
        'address':this.state.address,  
        'email':this.state.email,  
        'contact':this.state.contact,  
        'id':this.state.id,  
          
    }  
    $.ajax({  
      url: Url,  
      dataType: 'json',  
      type: 'POST',  
      data: studentdata,  
      success: function(data) {         
          alert(data.data);         
          this.setState(this.getInitialState());  
          this.componentDidMount();  
           
      }.bind(this),  
      error: function(xhr, status, err) {  
         alert(err);       
      }.bind(this)  
    });  
  },  
  
  render: function() {  
    return (   
      <div className="container"  style={{marginTop:'50px'}}>  
        <spam>{this.state.data1}</spam>
      </div> 
    );  
  }  
});  
  
ReactDOM.render(<StudentAll  />, document.getElementById('root'))  