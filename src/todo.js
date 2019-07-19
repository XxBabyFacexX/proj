import React from "react";
import { Input, List, Icon, DatePicker,Button,Checkbox, Layout,Col,Row } from "antd";
import "./index.css"
import "antd/dist/antd.css";

const {Header,Footer,Content}=Layout
const LOCALSTORAGE_KEY = 'someJson'

export default class Todo extends React.Component{
	constructor(){
		super();
    	
		this.state = {
	    	todos: JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)),
	    	tab:1
	    };
	    //alert();

	    // if (!window.localStorage.getItem(LOCALSTORAGE_KEY)==''){
	    // 	this.setState({
	    // 		todos:JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY))
	    // 	})
	    // }
	}

	removeTodo = index => {
		//alert('rem')

	    let newTodos = [...this.state.todos];

	    // Remove element
	    newTodos.splice(index, 1);

	    // Decrement greater indexes
	    for (let i = index; i < newTodos.length; i++) {
	      newTodos[i].index -= 1;
	    }

	    // Update state
	    this.setState({
	      todos: newTodos,
	    });
	    var json = JSON.stringify(newTodos)
	    window.localStorage.setItem(LOCALSTORAGE_KEY,json)
	  };

	 handlePressEnter = e => {
	    // Create a todo object containing its index, content,
	    // as well as an empty date
	    const todo = {
	      index: this.state.todos.length,
	      content: e.target.value,
	      //date: null,
	      prog:true,
	      dateString: ""
	    };

	    
	    const newTodos = this.state.todos.concat(todo);

	    this.setState({
	      todos: newTodos
	    });
	    var json = JSON.stringify(newTodos)
	    //alert(json)
	    window.localStorage.setItem(LOCALSTORAGE_KEY,json)
	    
	    e.target.value = "";
	  };

	  // setDate = (index, date, dateString) => {
	  //   // Set the date of the given todo
	  //   let newTodos = [...this.state.todos];
	  //   newTodos[index].date = date;
	  //   newTodos[index].dateString = dateString;

	  //   // Initialize the state
	  //   this.setState({
	  //     todos: newTodos
	  //   });
	  //   var json = JSON.stringify(newTodos)
	  //   window.localStorage.setItem(LOCALSTORAGE_KEY,json)
	  // };

	  cbox=(index)=>{

	  	let newTodos = [...this.state.todos];
	  	if (newTodos[index].prog) {
	  		newTodos[index].prog = false;
	  	}
	  	else{
	  		newTodos[index].prog = true;
	  	}
	  	
	  	this.setState({
	   		todos: newTodos
	  	});
	  	var json = JSON.stringify(newTodos)
	    window.localStorage.setItem(LOCALSTORAGE_KEY,json)
	  };
	  handle=()=>{
	      this.setState({
	        tab:0,
	      });
	    };
	    handle1=()=>{
	      this.setState({
	        tab:1,
	      });
	    };
	    handle2=()=>{
	      this.setState({
	        tab:2,
	      });
	    };

	itms=(items)=>{
		var item = []
		for (const [index, value] of items.entries()) {
			if (this.state.tab==0) {
				item.push(value)
			}
			else if (this.state.tab==1) {
				if (value.prog) {
					item.push(value)
				}	
			}
			else{
				if (!value.prog) {
					item.push(value)
				}
			}
		}
		return item
	}


	render() {
		return (
			<Layout>
				<Content>
			      	<div className="todoContainer">
				        <Header><h1 className="header">TODO App</h1></Header>
				        <Layout>
					        <Row>
					        	<Col span={8}></Col>
					        	<Col span={8}>
							        <Input
							          placeholder="What needs to be done?"
							          onPressEnter={this.handlePressEnter}
							        />

							        <Row>
								        <Col span={2}></Col>
						        		<Col span={22}>
							        		<Row>
										        <List
										        	locale={{ emptyText: "No todo items" }}
										        	dataSource={this.itms(this.state.todos)}
										        	renderItem={item => (
										            <Row>
											            <TodoItem
											           		cbox={this.cbox}
											            	todo={item}
											            	removeTodo={this.removeTodo}
											            	// setDate={this.setDate}
											            />
										            </Row>
										          )}
										        />
									        </Row>
								        </Col>
							    		<Col span={2}></Col>
							        </Row>
							    </Col>
							    <Col span={8}></Col>
					        </Row>
				        </Layout>
					</div>
				</Content>
				<Footer>
					<Col span={8}></Col>
					<Col span={8}>
						<div>
				            <Button type={this.state.tab===0?"danger":"dashed" }  onClick={this.handle}>all</Button>
				            <Button type={this.state.tab===1?"danger":"dashed" } onClick={this.handle1}>active</Button>
				            <Button type={this.state.tab===2?"danger":"dashed" } onClick={this.handle2}>completed</Button>
			        	</div>
		        	</Col>
					<Col span={8}></Col>
	        	</Footer>
			</Layout>
		);
	}
}


class TodoItem extends React.Component {
  handleCheck=()=>{
     this.props.cbox(this.props.todo.index);
  };
  remove = () => {
    // Remove this TodoItem
    this.props.removeTodo(this.props.todo.index);
  };

  // handleDateChange = (date, dateString) => {
  //   // Update the date when changed
  //   this.props.setDate(this.props.todo.index, date, dateString);
  // };
  

  render() {
    return (
      <List.Item
        actions={[
        	<Checkbox 
          onChange={this.handleCheck}
          />,
          // <DatePicker
          //   format="MM/DD/YYYY"
          //   onChange={this.handleDateChange}
          //   value={this.props.todo.date}
          // />,
          <Icon
            type="close-circle"
            theme="filled"
            onClick={this.remove}
          />
        ]}
      >
        {this.props.todo.content}
      </List.Item>
    );
  }
}