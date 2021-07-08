class Api::ImagesController < ApplicationController

  def index
    render json: Image.all
  end

  def upload_1_image
    file = params[:file]
    if file
      begin
        cloud_image = Cloudinary::Uploader.upload(file, 
          public_id: file.original_filename, 
          secure: true, 
          resource_type: :auto
        )
        image = Image.create(
          url: cloud_image["secure_url"],
        )
        render json: {file:file, cloud_image: cloud_image, image: image}
      rescue => err
        render json: {
          message: 'failed to save to cloudinary or our database',
          errors: err
        }, status: 422
      end
    end
  end

end
