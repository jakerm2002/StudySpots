# Based off of gpdowning/python
FROM python

# update Linux package manager
RUN apt-get update

# line-ending converter
RUN apt-get -y install dos2unix

# GNU bignum library, required by checktestdata
RUN apt-get -y install libboost-dev

# GNU bignum library, required by checktestdata
RUN apt-get -y install libgmp-dev

# editor
RUN apt-get -y install vim

# update Python package manager
RUN pip install --upgrade pip
RUN pip --version

# auto formatter
RUN pip install black

# coverage tool
RUN pip install coverage

# type annotator
RUN pip install mypy

# number library
RUN pip install numpy

# static analyzer
RUN pip install pylint

# Other packages that we used
RUN pip install requests

# build checktestdata, an input verifier
RUN git clone https://github.com/DOMjudge/checktestdata checktestdata && \
    cd checktestdata                                                  && \
    git checkout release                                              && \
    ./bootstrap                                                       && \
    make                                                              && \
    cp checktestdata /usr/bin                                         && \
    cd -

CMD bash
