class CreateRefrences < ActiveRecord::Migration[6.1]
  def change
    create_table :refrences do |t|
      t.string :link
      t.string :text
      t.belongs_to :page, null: false, foreign_key: true

      t.timestamps
    end
  end
end
