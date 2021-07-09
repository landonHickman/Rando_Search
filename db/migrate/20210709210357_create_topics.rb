class CreateTopics < ActiveRecord::Migration[6.1]
  def change
    create_table :topics do |t|
      t.string :topic_name

      t.timestamps
    end
  end
end
