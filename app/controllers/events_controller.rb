class EventsController < ApplicationController
    require "securerandom"
    
    def index
    end
    
    def show
    end
    
    def create
        event = Event.new
        event.attributes = {
            title: params[:title],
            start: params[:start],
            end:    params[:end],
            allDay: params[:allDay],
            event_id: SecureRandom.uuid
        }
        event.save
        respond_to do |format|
            format.json {
                render json:
                @event.to_json(
                  only: [:title, :start, :allDay]
                )
            }
        end
    end

    
    def new
        @event = Event.new
    end
    
    def edit
        @event = Event.find(params[:id])
    end
    
    def update
        @event = Event.find(params[:id])
    end
    
    def events
        @event = Event.all
        # render :json => @event
        respond_to do |format|
          format.json {
            render json:
            @event.to_json(
              only: [:id, :title, :start, :end, :event_id]
            )
          }
        end
    end
    
    def event
        # @event = Event.find()
    end

end
