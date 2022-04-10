import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import { FixedSizeGrid as Grid } from 'react-window';
import { Cell } from '../Cell';
import { WeekDays } from '../../utils/constants';

// slyles for the components
const CalendarWrapper = styled.div`
	width: 100%;
	position: relative;
	*{
		scrollbar-width: thin;
	}
	*::-webkit-scrollbar {
		width: 5px;
		background: rgba(0,0,0, 0.05);
	}
	
	*::-webkit-scrollbar-thumb {
		width: 5px;
		background: gray; 
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

const ScrollToToday = styled.div`
	background: rgba(0, 0, 0, 0.5);
	color: white;
	height: 25px;
	position: absolute;
	bottom: 0;
	padding-top: 5px;
	text-align: center;
	width: 100%;
	cursor: pointer;
`;

// the main body component
export function CalendarBodyComponent({
	setCurrentYear,
	setCurrentMonth,
	currentMonth,
	events,
	initialDate,
	currentYear,
}) {
	const gridRef = useRef(null);
	const theme = useTheme();
	const todaysDate = new Date();

	useEffect(() => {
		const currentTime = new Date(initialDate);
		const currentOffset = currentTime.getTimezoneOffset();
		const ISTOffset = 330;
		const ISTTime = new Date(
			currentTime.getTime() + (ISTOffset + currentOffset) * 60000
		);
		const weekOffSet = Math.round(
			(ISTTime - new Date(1970, 1, 4)) / (7 * 24 * 60 * 60 * 1000)
		);
		gridRef.current.scrollToItem({
			columnIndex: 2,
			rowIndex: weekOffSet + 7,
		});
	}, []);

	const scrollToCurrentDate = useCallback(() => {
		const currentOffset = todaysDate.getTimezoneOffset();
		const ISTOffset = 330;
		const ISTTime = new Date(
			todaysDate.getTime() + (ISTOffset + currentOffset) * 60000
		);
		const weekOffSet = Math.round(
			(ISTTime - new Date(1970, 1, 4)) / (7 * 24 * 60 * 60 * 1000)
		);
		gridRef.current.scrollToItem({
			columnIndex: 2,
			rowIndex: weekOffSet + 7,
		});
	}, [gridRef, todaysDate]);

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
				{!(
					todaysDate.getMonth() === currentMonth &&
					todaysDate.getFullYear() === currentYear
				) && <ScrollToToday onClick={scrollToCurrentDate}>Today</ScrollToToday>}
			</CalendarWrapper>
		</>
	);
}
