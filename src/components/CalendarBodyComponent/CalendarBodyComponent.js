import React, { useRef, useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { FixedSizeGrid as Grid } from 'react-window';
import { Cell } from '../Cell';
import { WeekDays } from '../../utils/constants';

// slyles for the components
const CalendarWrapper = styled.div`
	width: 100%;
	height: 83vh;
	&::-webkit-scrollbar,
	*::-webkit-scrollbar {
		display: none;
	}
`;

const DatesWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: hidden;
`;

const HeaderRow = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 98.75%;
`;

const HeaderCell = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.2px solid rgb(230, 230, 230);
	font-weight: bold;
`;

// the main body component
export function CalendarBodyComponent({
	setCurrentYear,
	setCurrentMonth,
	currentMonth,
	events,
}) {
	const gridRef = useRef(null);
	const theme = useTheme();

	useEffect(() => {
		let currentTime = new Date();
		let currentOffset = currentTime.getTimezoneOffset();
		let ISTOffset = 330;
		let ISTTime = new Date(
			currentTime.getTime() + (ISTOffset + currentOffset) * 60000
		);
		let weekOffSet = Math.round(
			(ISTTime - new Date(1970, 1, 4)) / (7 * 24 * 60 * 60 * 1000)
		);
		gridRef.current.scrollToItem({
			columnIndex: 2,
			rowIndex: weekOffSet + 7,
		});
	}, []);

	return (
		<>
			<CalendarWrapper>
				<HeaderRow>
					{WeekDays.map((day, index) => (
						<HeaderCell
							key={index + day + Math.random().toString()}
							style={{
								height: '5vh',
							}}
						>
							{day}
						</HeaderCell>
					))}
				</HeaderRow>
				<DatesWrapper>
					<Grid
						style={{
							overflowX: 'hidden',
						}}
						useIsScrolling
						ref={gridRef}
						className='gridWrapper'
						columnCount={7}
						columnWidth={theme.wrapper.width / 7.1}
						height={theme.wrapper.height}
						rowCount={220000}
						rowHeight={110}
						width={theme.wrapper.width}
						itemData={{
							setCurrentMonth: setCurrentMonth,
							setCurrentYear: setCurrentYear,
							currentMonth: currentMonth,
							events: events,
							otherData: true,
						}}
					>
						{Cell}
					</Grid>
				</DatesWrapper>
			</CalendarWrapper>
		</>
	);
}
