import React, { KeyboardEvent } from 'react';
import { Container } from './Styles';
import { Item } from '../../types/Item';

type Props = {
    value: string,
    onChange(e: Event): void,
    onKeyUp(e: KeyboardEvent): void
}

export default class AddArea extends React.Component<Props> {
	render(){
		return (
			<Container>
				<div className="image">➕</div>
				<input 
					type="text"
					placeholder="Adicione um item"
                    value={this.props.value}
                    onChange={(e: any)=> this.props.onChange(e.target.value)}
                    onKeyUp={(e: KeyboardEvent)=> this.props.onKeyUp(e)}
				/>
			</Container>
		);
	}
};
