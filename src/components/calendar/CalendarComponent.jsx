import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { allEvents } from '../../mock/data';

const CalendarComponent = () => {
    const [view, setView] = useState(location.pathname === '/calendar/weekly' ? 'timeGridWeek' : 'dayGridMonth');
    const [weekStartDate, setWeekStartDate] = useState(null);
    const [weekEndDate, setWeekEndDate] = useState(null);
    const calendarRef = useRef(null);
    const { pathname } = useLocation()



    const getWeekDates = (arg) => {
        // console.log(arg, 'arg')
        const startDate = arg.startStr.split('+')[0];
        // const endDate = arg.view.activeEnd
        const endDate = arg.view.activeEnd;
        // console.log(endDate.toISOString().split('Z')[0], 'endDate')
        setWeekStartDate(startDate)
        setWeekEndDate(endDate.toISOString().split('Z')[0])
    }

    useEffect(() => {
        const newView = location.pathname === '/calendar/weekly' ? 'timeGridWeek' : 'dayGridMonth';
        setView(newView);

        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.changeView(newView);
        }
    }, [pathname]);
    const transformedEvents = allEvents?.data.map(event => ({
        title: `Meeting ${event.notes ? `- ${event.notes}` : ''}`,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
        backgroundColor: '#3B82F6',
        extendedProps: {
            contactId: event.contactId,
            facilityId: event.facilityId,
            meetingNotes: event.notes,
            id: event._id
        }
    }));
    return (

        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={view}
            datesSet={(arg) => getWeekDates(arg)}
            headerToolbar={{
                start: 'title prev next', // will normally be on the left. if RTL, will be on the right
                center: '',
                end: 'today dayGridWeek dayGridMonth' // will normally be on the right. if RTL, will be on the left
            }}
            buttonText={{
                dayGridWeek: 'Week',
                dayGridMonth: 'Month',
                today: 'Day',
            }}

            // customButtons={{
            //     customButton: {
            //         text: 'Add New Event', // Button label
            //         click: () => handleModal(), // Action on click
            //     },
            // }}
            // dateClick={handleDateClick}
            // eventClick={handleEventClick}
            // events={[
            //     {
            //         title: 'Event 1',
            //         start: new Date(2025, 0, 30, 14, 0),
            //         end: new Date(2025, 0, 30, 16, 0),  // (year, month, day, hour, minute),
            //         backgroundColor: 'blue',
            //         extendedProps: {
            //             location: 'Room 123',
            //             organizer: 'John Doe'
            //         }
            //     },
            // ]}
            events={transformedEvents}
        />
    )
}

export default CalendarComponent