class ClassDiagram::ClassesController < ApplicationController
  before_action :set_classe, only: [:edit, :update, :destroy]
  before_action :set_diagrama, only: [:new, :edit]

  def new
    @classe = ClassDiagram::Classe.new
  end

  def edit
  end

  def create
    respond_to do |format|
      begin
        @classe = ClassDiagram::Classe.new(classe_params)
        if @classe.save
          flash[:notice] = 'Classe criada com sucesso.'
          format.html { redirect_to edit_class_diagram_classes_path(@classe, class_diagram_diagrama_id: params[:class_diagram_classe][:class_diagram_diagrama_id]) }
        end
        if @classe.errors.any?
          flash[:alert] = catch(@classe)
          @params_for_reload = classe_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = classe_params
      end
      format.html { redirect_to new_class_diagram_classes_path(params: @params_for_reload) }
    end
  end

  def update
    respond_to do |format|
      begin
        flash[:notice] = 'Classe atualizada com sucesso.' if @classe.update(classe_params)
        if @classe.errors.any?
          flash[:alert] = catch(@classe)
          @params_for_reload = classe_params
        end
      rescue StandardError => e
        flash[:error] = e.message
        @params_for_reload = classe_params
      end
      format.html { redirect_to edit_class_diagram_classes_path(@classe, params: @params_for_reload, class_diagram_diagrama_id: params[:class_diagram_classe][:class_diagram_diagrama_id]) }
    end
  end

  def destroy
    respond_to do |format|
      begin
        flash[:notice] = 'Classe removida com sucesso.' if @classe.destroy
        flash[:alert] = catch(@classe) if @classe.errors.any?
      rescue StandardError => e
        flash[:error] = e.message
      end
      format.html { redirect_to edit_class_diagram_diagramas_path(@classe.class_diagram_diagrama_id) }
    end
  end

  private
    def set_classe
      @classe = ClassDiagram::Classe.find(params[:id])
    end

    def set_diagrama
      @diagrama = ClassDiagram::Diagrama.find(params[:class_diagram_diagrama_id])
    end

    def classe_params
      @params_for_reload = {}
      params.require(:class_diagram_classe).permit(:class_diagram_diagrama_id, :nome, :estereotipo)
    end
end
