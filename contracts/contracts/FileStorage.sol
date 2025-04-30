
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    struct FileRecord {
        address uploader;
        string ipfsHash;
        uint timestamp;
    }

    FileRecord[] public files;

    event FileUploaded(address indexed uploader, string ipfsHash, uint timestamp);

    function uploadFile(string memory _ipfsHash) public {
        files.push(FileRecord(msg.sender, _ipfsHash, block.timestamp));
        emit FileUploaded(msg.sender, _ipfsHash, block.timestamp);
    }

    function getFile(uint index) public view returns (address, string memory, uint) {
        FileRecord memory file = files[index];
        return (file.uploader, file.ipfsHash, file.timestamp);
    }

    function getTotalFiles() public view returns (uint) {
        return files.length;
    }
}
