class CreatePages < ActiveRecord::Migration[6.1]
  def change
    create_table :pages do |t|
      t.string :page_title
      t.string :image
      t.belongs_to :topic, null: false, foreign_key: true

      t.timestamps
    end
  end
end
