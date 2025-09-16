import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useRef, useState } from 'react';
import { useGetAllOrdersWithCalendarQuery } from '../../../api/apiSlice';
import CustomLoader from '../../../components/CustomLoader';
import Tabs from '../../../components/Tabs';
import OrderCard from './OrderCard';
import './styles.css';


const Calendar = () => {
    const [activeTab, setActiveTab] = useState(0);
    const calendarRef = useRef(null);
    const tabs = ['Weekly', 'Monthly'];
    const [view, setView] = useState(activeTab === 0 ? 'timeGridWeek' : 'dayGridMonth');
    const [weekStartDate, setWeekStartDate] = useState(null);
    const [weekEndDate, setWeekEndDate] = useState(null);

    const getWeekDates = (arg) => {
        console.log(arg, 'arg')
        const startDate = arg.startStr.split('+')[0];
        const endDate = arg.endStr.split('+')[0];
        setWeekStartDate(startDate)
        setWeekEndDate(endDate)
    }
    const { data: orders, isLoading } = useGetAllOrdersWithCalendarQuery(
        { startDate: weekStartDate, endDate: weekEndDate },
        { skip: !weekStartDate || !weekEndDate }
    )


    // console.log(orders?.data?.orders, 'orders')
    const handleTabChange = (tab, index) => {
        setActiveTab(index);
    };
    const transformedEvents = orders?.data?.orders?.map(order => ({
        // title: `${order.serviceId ? `- ${order.serviceId?.serviceName}` : ''}`,
        description: ` ${order.serviceId ? `- ${order.serviceId?.description}` : ''}`,
        start: order.createdAt,
        // end: new Date(order.updatedAt),
        title: order?.customerName,
        // backgroundColor: 'transparent',
        // color: ''
        // extendedProps: {
        //     contactId: order.contactId,
        //     facilityId: order.facilityId,
        //     meetingNotes: order.notes,
        //     id: order._id
        // }
    }));

    useEffect(() => {
        const newView = activeTab === 0 ? 'timeGridWeek' : 'dayGridMonth';
        setView(newView);

        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.changeView(newView);
        }
    }, [activeTab]);
    // console.log(weekStartDate, 'weekStartDate')
    return (
        <>
            {isLoading ? <CustomLoader /> : (
                <div className='flex gap-4'>
                    <OrderCard orders={orders?.data?.orders} />

                    <div className='flex-1 relative'>
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                            style='justify-end absolute top-0 right-0'
                        />
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, timeGridPlugin]}
                            initialView={view}
                            datesSet={(arg) => getWeekDates(arg)}
                            headerToolbar={{
                                left: 'prev title next',
                                center: '',
                                right: '',
                            }}
                            events={transformedEvents}

                        />
                    </div>
                </div>
            )}
        </>

    )
}

export default Calendar