import React from 'react';
import { Container } from './Styles';
import { Item } from '../../types/Item';

type Props = {
    item: Item;
    onChange(): void
    removeItem(name: string): void
}

export default class ListItem extends React.Component<Props> {	
	render(){
		return (
			<Container done={this.props.item.done}>
				<input 
					type="checkbox" 
					checked={this.props.item.done} 
					onChange={()=> this.props.onChange()}
				/>
				<label htmlFor="">{this.props.item.name}</label>
                <div className="image"><a onClick={()=> this.props.removeItem(this.props.item.name)}>➖</a></div>
     		</Container>
		);
	}
};
