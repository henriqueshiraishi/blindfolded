class CreateClassDiagramAssociacao < ActiveRecord::Migration[5.1]
  def change
    create_table :class_diagram_associacao do |t|
      t.references :class_diagram_classe, foreign_key: true
      t.integer :classe_destino
      t.integer :tipo_associacao, default: 0
      t.string :multi_a
      t.string :multi_b
      t.string :estereotipo

      t.timestamps
    end
  end
end
