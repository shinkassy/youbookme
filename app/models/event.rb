class Event < ActiveRecord::Base
    def insert_event(event) 
      start_time = DateTime.parse(event[1])
      end_time = DateTime.parse(event[2])

       event_resorces = {
                'summary' => event[0],
                'start' => {
                            'dateTime' => start_time
                           },
                'end' =>   {
                            'dateTime' => end_time
                           },
                }
        result = @client.execute(:api_method => @service.events.insert,
                               :parameters => {'calendarId' => email },
                               :body => JSON.dump(event_resorces),
                               :headers => {'Content-Type' =>   'application/json'})
    end
end
