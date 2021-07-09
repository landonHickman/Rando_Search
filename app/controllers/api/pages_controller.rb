class Api::PagesController < ApplicationController
before_action :set_topic
before_action :set_page, only: [:show, :update, :destroy]

def index
  render json: @topic.pages.all
end

def show
  render json: @page
end

def create
  @page = @topic.pages.new(page_params)
  if @page.save
    render json: @page
  else
    render json: @page.errors, status: 422
  end
end

def update
  if @page.update(page_params)
    render json: @page
  else
    render json: @page.errors, status: 422
  end
end

def destroy
  render json: @page.destroy
end

private
def set_topic
  @topic = Topic.find(params[:topic_id])
end

def set_page
  @page = @topic.pages.find(params[:id])
end

def page_params
  params.require(:page).permit(:page_title, :image)
end

end

