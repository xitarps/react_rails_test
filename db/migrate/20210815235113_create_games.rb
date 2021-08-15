class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :title
      t.string :style
      t.integer :quantity

      t.timestamps
    end
  end
end
