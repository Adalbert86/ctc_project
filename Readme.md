CTC (Customers and their Certificates)
solution implemented by Vojtech Novak, June 6th, 2018

The backend is implementing REST API and is running on Python + Flask.
The frontend is utilizing React framework

The frontend sends request to the backend API which is listening on port 5000.


Instructions to build and run:

1. Clone this project into your local machine using GIT
	(git clone https://github.com/Adalbert86/ctc_project.git)

2. Run ./dockerize.sh from your shell

3. It WILL take time! On my machine between 5-8 minutes. Please, go get a coffee in the meanwhile :-)

4. In this step the Ubuntu image will download and install all the libraries needed to run both frontend and backend services.

5. When this is complete, you can access "localhost:3000" address in your browser to see the running app.


...

To re-run the project after is has been stopped, please, type:
docker run -p 3000:3000 --mount source=ctc_project_20180606_myvol1,target=/media/myvol1/ ctc_project_20180606



