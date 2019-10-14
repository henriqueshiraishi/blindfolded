class CreateClassDiagramDiagrama < ActiveRecord::Migration[5.1]
  def change
    create_table :class_diagram_diagrama do |t|
      t.references :user, foreign_key: true
      t.string :nome

      t.timestamps
    end
  end
end
