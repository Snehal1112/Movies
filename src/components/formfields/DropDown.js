import React, {useState, useRef,useEffect} from 'react';
import Input from "./Input";
import "./DropDown.scss";

export const DropDownItem = ({id, name, selected}) => {
	return (
		<div className={"dropDownItem"} id={id}>{name}</div>
	);
};

const DropDown = (props) => {
	const {
		children,
		onSelect = () => {},
		placeHolder,
		size = 100,
		multiSelect = false,
		maxSelect = 1,
		minSelect = 0
	} = props;

	const [arrow, setArrow] = useState('arrow_downward');
	const [show, setShow] = useState(false);
	const [text, setText] = useState('');
	const [selectItem, setSelectItem] = useState([]);
	const refContainer = useRef(null);

	const onClickHandler = () => {
		setShow(!show);
	};

	useEffect(() => {
		console.log(show)
		setArrow(!show ? 'arrow_downward' : 'arrow_upward');
		if (show) {
			const dropDownListContainer = refContainer.current;
			const selectedItems = dropDownListContainer.querySelectorAll('.selectedItem');
			if (selectedItems.length === 0 && selectItem.length > 0) {
				selectItem.map(id => {
					const item = dropDownListContainer.querySelector(`#${id}`);
					item.classList.add('selectedItem');
					return item;
				})
			}
		} else {
			if (selectItem.length > 0) {
				onSelect(text);
			}
		}
	},[show]);

	const removeSelectedItem = (textContent) => {
		const filterItem = selectItem.filter(item => item !== textContent);
		setSelectItem(filterItem);
	};

	const onClickDropDownItem = (event) => {
		const target = event.target;
		const textContent = target.textContent
		const classList = target.classList;
		if (multiSelect) {
			handleMultiSelect(classList, textContent)
		} else {
			setShow(false);
			setText(target.textContent);
			onSelect(target);
		}
	};

	const handleMultiSelect = (classList, textContent) => {
		const toggleCls = classList.toggle('selectedItem');
		const selectedItems = refContainer.current.querySelectorAll('.selectedItem');

		// Update state.
		if (selectedItems) {
			if (toggleCls) {
				if (selectItem.length === maxSelect) {
					classList.remove('selectedItem');
					alert(`You can select max ${maxSelect} items.`);
					return;
				}
				setSelectItem([...selectItem, textContent]);
			} else {
				removeSelectedItem(textContent)
			}
		}

		const itemText = []
		selectedItems.forEach(item => itemText.push(item.textContent));
		setText(itemText.join(';'));
	};

	return (
		<div className={"dropDownContainer"}>
			<Input type="text"
			       name="dropdown"
			       value={text}
			       readOnly={true}
			       size={size}
			       actionBtn={{icon: arrow, show: true, handler: onClickHandler}}
			       placeHolder={placeHolder}
			       onClick={onClickHandler}
			/>
			{show && (
				<div ref={refContainer} className={"dropDownItemContainer"} onClick={onClickDropDownItem}>
					{
						children
					}
				</div>)}
		</div>
	);
};

export default DropDown;
