import React from 'react';
import styled from 'styled-components';
import { Month } from '../../utils/constants';

const Header = styled.header`
	height: 6vh;
	box-sizing: border-box;
	text-align: right;
	font-size: 28px;
	font-weight: 700;
	padding: 5px;

	@media (max-width: 700px) {
		font-size: 18px;
	}
`;

export function CalendarHeaderComponent({ currentMonth, currentYear }) {
	return (
		<Header>
			<span
				style={{
					fontWeight: 400,
				}}
			>
				<b>{Month[currentMonth]}</b> {currentYear}
			</span>
		</Header>
	);
}
