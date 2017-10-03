class ChangeDatatypeAllDayOfEvents < ActiveRecord::Migration
  def change
    change_column :events, :allDay, :boolean
  end
end
