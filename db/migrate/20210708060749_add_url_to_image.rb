class AddUrlToImage < ActiveRecord::Migration[6.1]
  def change
    add_column :images, :url, :string
  end
end
