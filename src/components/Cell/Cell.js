import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Month } from '../../utils/constants';

const CellWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border: 0.2px solid rgb(230, 230, 230);
	text-align: center;
	font-size: 12px;
	position: relative;
`;

const ScrollDetails = styled.span`
	background: white;
	position: absolute;
	top: 1px;
`;


export function Cell({
	columnIndex,
	rowIndex,
	style,
	data,
	isScrolling,
}) {
	const { setCurrentYear, setCurrentMonth, currentMonth, events } = data;
	const [display, setDisplay] = useState(false);
	const [componentIndex, setComponentIndex] = useState(null);

	useEffect(() => {
		const now = new Date(0);
		now.setDate(now.getDate() + (rowIndex - 1) * 7 + columnIndex + 3);
		if (now.getMonth() === 0) {
			setCurrentMonth(11);
			setCurrentYear(now.getFullYear() - 1);
		} else {
			setCurrentMonth(now.getMonth() - 1);
			setCurrentYear(now.getFullYear());
		}

		// eslint-disable-next-line array-callback-return
		let filteredArray = events.filter((date, index) => {
			if (
				now.getDate() === date.date.getDate() &&
				now.getMonth() === date.date.getMonth() &&
				now.getFullYear() === date.date.getFullYear()
			) {
				setComponentIndex(index);
				return true;
			}
		});

		if (filteredArray.length) {
			setDisplay(Boolean(filteredArray.length));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentMonth]);

	const now = new Date(0);
	now.setDate(now.getDate() + (rowIndex - 1) * 7 + columnIndex + 3);
	const weekEndDate = new Date(now);
	weekEndDate.setDate(weekEndDate.getDate() + 6);
	return (
		<>
			<CellWrapper
				style={{
					...style,
					backgroundColor:
						columnIndex === 0 ? 'rgba(0,0,0, 0.1)' : 'transparent',
					fontWeight: now.getMonth() === currentMonth ? 900 : 400,
				}}
			>
				{isScrolling ? (
					columnIndex === 0 && now.getDate() === 1 ? (
						<>
							<ScrollDetails>
								<b>
									{Month[now.getMonth()]} {now.getFullYear()}
								</b>
							</ScrollDetails>
							{now.getDate()}
						</>
					) : columnIndex === 0 &&
					  now.getDate() > weekEndDate.getDate() &&
					  (now.getMonth() < weekEndDate.getMonth() ||
							(now.getMonth() === 11 &&
								now.getMonth() > weekEndDate.getMonth())) ? (
						<>
							<ScrollDetails>
								<b>
									{now.getMonth() === 11
										? `${Month[(now.getMonth() + 1) % 12]} ${
												now.getFullYear() + 1
										  }`
										: `${
												Month[(now.getMonth() + 1) % 12]
										  } ${now.getFullYear()}`}
								</b>
							</ScrollDetails>
							{now.getDate()}
						</>
					) : (
						now.getDate()
					)
				) : (
					now.getDate()
				)}
				{display && componentIndex !== null && events[componentIndex].component}
			</CellWrapper>
		</>
	);
}
