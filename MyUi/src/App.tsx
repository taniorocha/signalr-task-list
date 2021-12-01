import React, { KeyboardEvent } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Item } from './types/Item';
import ListItem from './components/ListItem/ListItem';
import AddArea from './components/AddArea/AddArea';

import {
	Container,
	Area,
	Header
} from './App.styles';

type State = {
    connection: any,
    itemField: string;
	list: Item[];
}

export default class App extends React.Component {
	state: State = {
        connection: undefined,

        itemField: '',
		list: []
	};

    componentDidMount(){
        this.joinConnection();
    }

    async joinConnection(){
        try{
            const connection = new HubConnectionBuilder()
            .withUrl("https://tanio-task-list.herokuapp.com/chat")
            .configureLogging(LogLevel.Information)
            .build();

            connection.on("UpdateList", (items: Item[]) => {
                this.updateList(items);
            });

            await connection.start();
            await connection.invoke("JoinConnection");
            this.setState({connection: connection});
        } catch(e){
            console.log(e);
        }
    }

    handleKeyUp = async (value: KeyboardEvent) => { 
        if(value.code !== 'Enter' && value.which !== 13 || this.state.itemField === '')    
            return;
        
        var newList = this.state.list;
        var checkItem = newList.filter(x=>  x.name.toLowerCase() === this.state.itemField.toLowerCase());
        if(checkItem.length > 0){
            alert('Item já está na lista.');
            return;
        }

        try{
            const request = {
                Name: this.state.itemField,
                Done: false
            }
            await this.state.connection.invoke("NewItem", request);
        } catch(e){
            console.log(e);
        }
    }

    async changeCheckItem(name: string){
        try{
            await this.state.connection.invoke("ChangeCheckItem", name);
        } catch(e){
            console.log(e);
        }
    }

    async removeItem(name: string){
        try{
            await this.state.connection.invoke("RemoveItem", name);
        } catch(e){
            console.log(e);
        }
    }

    updateList(newList: Item[]){
        this.setState({list: newList, itemField: ''});
    }
	
	render(){
		return (
			<Container>
				<Area>
					<Header>Lista de Compras</Header>

					<AddArea 
                        value={this.state.itemField} 
                        onChange={(e: Event)=> this.setState({itemField: e})} 
                        onKeyUp={this.handleKeyUp} 
                    />
					{this.state.list.map((item: Item, key: number)=> (
						<ListItem 
                            key={key} 
                            item={item} 
                            onChange={() => this.changeCheckItem(item.name)}
                            removeItem={(name: string)=> this.removeItem(name)}
                        />
					))}
				</Area>
			</Container>
		);
  	}
};
