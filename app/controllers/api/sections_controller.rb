class Api::SectionsController < ApplicationController
  before_action :set_topic
  before_action :set_page
  before_action :set_section, only: [:show, :update, :destroy]
  
  def index
    render json: @page.sections.all
  end
  
  def show
    render json: @section
  end
  
  def create
    @section = @page.sections.new(section_params)
    if @page.save
      render json: @section
    else
      render json: @section.errors, status: 422
    end
  end
  
  def update
    if @section.update(section_params)
      render json: @section
    else
      render json: @section.errors, status: 422
    end
  end
  
  def destroy
    render json: @section.destroy
  end
  
  private
  def set_topic
    @topic = Topic.find(params[:topic_id])
  end
  
  def set_page
    @page = @topic.pages.find(params[:page_id])
  end

  def set_section
    @section = @page.sections.find(params[:id])
  end
  
  def section_params
    params.require(:section).permit(:article_title, :body)
  end
  
  end
