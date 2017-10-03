class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :owner_id
      t.integer :applicant_id
      t.string :title
      t.boolean :disp_flg
      t.datetime :start
      t.datetime :end
      t.string :allDay
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps null: false
    end
  end
end
