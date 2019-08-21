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
		maxSelect = 1
	} = props;

	const [arrow, setArrow] = useState('arrow_downward');
	const [show, setShow] = useState(false);
	const [text, setText] = useState('');
	const [selectedItems, setSelectedItem] = useState([]);
	const refContainer = useRef(null);

	useEffect(() => {
		setArrow(!show ? 'arrow_downward' : 'arrow_upward');
		if (show) {
			const dropDownListContainer = refContainer.current;
			const items = dropDownListContainer.querySelectorAll('.selectedItem');
			if (items.length === 0 && selectedItems.length > 0) {
				selectedItems.map(id => {
					const item = dropDownListContainer.querySelector(`#${id}`);
					item.classList.add('selectedItem');
					return item;
				})
			}
		} else if (selectedItems.length > 0) {
			onSelect(text);
		}
	},[show, onSelect, selectedItems, text]);

	/**
	 * Helper function which remove the already selected item from state
	 *
	 * @param {String} textContent The text which already selected by user.
	 */
	const removeSelectedItem = (textContent) => setSelectedItem(selectedItems.filter(item => item !== textContent));

	/**
	 * Event handler triggered when menu item selected.
	 *
	 * @param {Event.target} target The targeted element which triggered this event.
	 */
	const onSelectMenuItem = ({target}) => {
		const {textContent, classList} = target;
		if (multiSelect) {
			handleMultiSelect({classList, textContent})
		} else {
			handleSingleSelect({classList, textContent});
			setShow(false);
		}
	};

	/**
	 * Helper function which used to select the multiple
	 * drop down menu items.
	 *
	 * @param {Element.classList} classList The classList contains the list classes.
	 * @param {String} textContent The textContent contains text value of an element.
	 */
	const handleMultiSelect = ({classList, textContent}) => {
		const toggleCls = classList.toggle('selectedItem');
		const items = refContainer.current.querySelectorAll('.selectedItem');

		// Update state.
		if (items) {
			// toggleCls is true if user select the menu item.
			if (toggleCls) {
				// Show alert box if user reach to max selection limit.
				if (multiSelect && selectedItems.length === maxSelect) {
					classList.remove('selectedItem');
					alert(`You can select max ${maxSelect} items.`);
					return;
				}
				setSelectedItem([...selectedItems, textContent]);
			} else {
				// user is deselecting the already selected items.
				removeSelectedItem(textContent)
			}
		}

		const itemText = [];
		items.forEach(item => itemText.push(item.textContent));
		setText(itemText.join(';'));
	};

	/**
	 * Event handler called when drop down support to select only single item from the menu list.
	 * @param {Element.classList} classList The classList contains the list classes.
	 * @param {String} textContent The textContent contains text value of an element.
	 */
	const handleSingleSelect = ({classList, textContent}) => {
		const item = refContainer.current.querySelector('.selectedItem');

		if (item !== null && item.length > 0) {
			item.classList.remove('selectedItem');
		}
		const toggleCls = classList.toggle('selectedItem');
		if (toggleCls) {
			setSelectedItem([textContent]);
		} else {
			removeSelectedItem(textContent)
		}
		setText(textContent);
	};

	return (
		<div className={"dropDownContainer"}>
			<Input type="text"
			       name="dropdown"
			       value={text}
			       readOnly={true}
			       size={size}
			       actionBtn={{icon: arrow, show: true, handler: () => setShow(!show)}}
			       placeHolder={placeHolder}
			       onClick={() => setShow(!show)}
			/>
			{show && (
				<div
					ref={refContainer}
					className={"dropDownItemContainer"}
					onClick={onSelectMenuItem}
				>
					{children}
				</div>)}
		</div>
	);
};

export default DropDown;
