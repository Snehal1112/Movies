import React,{useState} from 'react';
import Input from "./Input";

const DropDown = (props) => {
	const [arrow, setArrow] = useState('arrow_downward');
	const [show, setShow] = useState(false);

	const onClickHandler = (text) => {
		setArrow(!show ? 'arrow_upward' : 'arrow_downward');
		setShow(!show);
	};

	return (
		<div className={"dropDownContainer"}>
			<Input type="text"
		       name="dropdown"
		       actionBtn={{
			       icon: arrow,
			       show: true,
			       handler:onClickHandler
		       }}
		           placeHolder={props.placeHolder}
			/>
				{show && (
					<div className={"dropDownItemContainer"} onClick={props.handler}>
						{props.children}
					</div>)}
		</div>
	);
};

export default DropDown;
