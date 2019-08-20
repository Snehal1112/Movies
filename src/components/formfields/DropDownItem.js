import React from 'react';

const DropDownItem = ({id, name}) => {
	return (
		<div className={"dropDownItem"} id={id}>{name}</div>
	);
};

export default DropDownItem;
