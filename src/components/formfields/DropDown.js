import React,{useState} from 'react';
import Input from "./Input";
import "./DropDown.scss";

export const DropDownItem = ({id, name}) => {
	return (
		<div className={"dropDownItem"} id={id}>{name}</div>
	);
};

const DropDown = (props) => {
	const {children, onSelect = () => {}, placeHolder, size = 100} = props;
	const [arrow, setArrow] = useState('arrow_downward');
	const [show, setShow] = useState(false);
	const [text, setText] = useState('');

	const onClickHandler = (text) => {
		setArrow(!show ? 'arrow_upward' : 'arrow_downward');
		setShow(!show);
	};

	const onClickDropDownItem = (event)=>{
		setShow(false);
		setArrow( 'arrow_downward');

		const target = event.target;
		setText(target.textContent);
		onSelect(target);
	};

	return (
		<div className={"dropDownContainer"}>
			<Input type="text"
				   name = "dropdown"
				   value={text}
				   readOnly={true}
				   size = {size}
				   actionBtn = {{icon: arrow, show: true, handler:onClickHandler}}
				   placeHolder={placeHolder}
			/>
			{show && (
				<div className={"dropDownItemContainer"} onClick={onClickDropDownItem}>
					{children}
				</div>)}
		</div>
	);
};

export default DropDown;
