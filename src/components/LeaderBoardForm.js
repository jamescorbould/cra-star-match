import { json } from 'body-parser';
import React from 'react';

const handleSubmit = event => {
	event.preventDefault();
	alert('You have submitted the form.');
};

const LeaderBoardForm = () => (
	<div className="form">
		<form onSubmit={handleSubmit}>
			<fieldset>
				<label>
					<p>Please enter your name</p>
					<input name="name" />
				</label>
			</fieldset>
			<button type="submit">Submit</button>
		</form>
	</div>
);

export default LeaderBoardForm;
