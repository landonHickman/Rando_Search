class CreateSections < ActiveRecord::Migration[6.1]
  def change
    create_table :sections do |t|
      t.string :article_title
      t.text :body
      t.belongs_to :page, null: false, foreign_key: true

      t.timestamps
    end
  end
end
