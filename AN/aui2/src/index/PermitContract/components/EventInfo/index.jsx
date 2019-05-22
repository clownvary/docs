import React from 'react';
import CustomQuestionAnswer from '../CustomerQuestionAnswer';
import WaiverInformation from '../WaiverInformation';
import BookingSummary from '../BookingSummary';
import formatAmount from '../../utils/formatAmount';
import './index.less';

const EventInfo = ({ events = [] }) => (
  <div className="event-info-section">
    {
      events.map((event) => {
        const { resources, questions, waivers, infos, eventName, resourceCount,
                bookingCount, totalAmount, customerNotes } = event;

        return (
          <div key={event.eventID}>
            {
              resources && resources.length > 0 &&
              <section className="event-info">
                <header>
                  <div className="event-info__header-box">
                    <div className="event-name" aria-label={`Event ${eventName}`} >{eventName}</div>
                    <div>
                      <span className="event-data"><strong>{resourceCount}</strong> resource(s)</span>
                      <span className="event-data"><strong>{bookingCount}</strong> booking(s)</span>
                      <span className="event-data"><strong>Subtotal: {formatAmount(totalAmount)}</strong></span>
                    </div>
                  </div>
                  {
                    customerNotes && customerNotes.length > 0 && (
                      <div className="event-notes">
                        <strong>Event Notes: </strong>
                        <p className="text-pre-wrap">{customerNotes}</p>
                      </div>
                    )
                  }
                  {
                    resources[0].eventTypeNotes && resources[0].eventTypeNotes.length > 0 && (
                      <div className="event-notes">
                        <strong>Event Type Notes: </strong>
                        <p className="text-pre-wrap">{resources[0].eventTypeNotes}</p>
                      </div>
                    )
                  }
                </header>
                <BookingSummary resources={resources} />
              </section>
            }
            {
              questions && questions.length > 0 &&
              <CustomQuestionAnswer questionAnswers={questions} />
            }
            {
              ((waivers && waivers.length > 0) ||
                (infos && infos.length > 0)) &&
                <WaiverInformation waivers={waivers} infos={infos} />
            }
          </div>
        );
      })
    }
  </div>
);

export default EventInfo;
